package org.example.aplication.hapier;

import org.example.domain.mapper.*;
import org.example.domain.hl7message.ESegmentType;
import org.example.domain.message.Message;
import org.example.domain.message.conditions.EStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Hapier {
    private StringToHL7MessageMapper stringToHL7MessageMapper;
    private HL7MessageToMessageMapper hl7MessageToMessageMapper;
    private MessageToHL7MessageMapper messageToHL7MessageMapper;
    private HL7MessageToStringMapper hl7MessageToStringMapper;

    public static final String ANY_NUMBER = "-1";

    public Hapier() {
        this.stringToHL7MessageMapper = new StringToHL7MessageMapper();
        this.hl7MessageToMessageMapper = new HL7MessageToMessageMapper();
        this.messageToHL7MessageMapper = new MessageToHL7MessageMapper();
        this.hl7MessageToStringMapper = new HL7MessageToStringMapper();
    }

    public Message from(EMap map, String message) {
        return hl7MessageToMessageMapper.map(stringToHL7MessageMapper.map(message), getMapperInfo(map.getMapper()));
    }

    public String to(EMap map, Message message) {
        return hl7MessageToStringMapper.map(messageToHL7MessageMapper.map(message, getMapperInfo(map.getMapper())));
    }

    public String to(EMap map, EStatus status, Message message) {
        return hl7MessageToStringMapper.map(messageToHL7MessageMapper.map(message, getMapperInfo(map.getMapper(status.name()))));
    }

    public MapperInfo getMapperInfo(String mapper) {
        MapperInfo mapperInfo = new MapperInfo();

        String[] mappers = mapper.split("\\r?\\n");
        mapperInfo.setOptionalMapperInfos(getOptionalMapperInfos(mappers));
        mappers = filterNonOptionalLines(mappers);
        for (String line : mappers) {
            String[] parts = line.split(" ");

            if (parts[0].equals("MessageType")) {
                mapperInfo.setMessageType(MapperMessageType.of(parts));
                continue;
            }

            MapLineInfo mapLineInfo = getMapLineInfo(parts);
            mapperInfo.addLine(mapLineInfo);
        }

        return mapperInfo;
    }

    private List<MapperInfo> getOptionalMapperInfos(String[] lines) {
        List<MapperInfo> mapperInfos = new ArrayList<>();
        MapperInfo mapperInfo = new MapperInfo();
        boolean isOptionalMapper = false;
        for (String line : lines) {
            if (line.contains("------")) {
                if (!mapperInfo.isEmptyMapperInfo()) {
                    mapperInfos.add(mapperInfo);
                    mapperInfo = new MapperInfo();
                }
               isOptionalMapper = !isOptionalMapper;
            }
            else if (isOptionalMapper) {
                mapperInfo.addLine(getMapLineInfo(line.split(" ")));
            }

        }
        return mapperInfos;
    }

    private String[] filterNonOptionalLines(String[] lines) {
        List<String> notOptionalLines = new ArrayList<>();
        boolean isOptionalMapper = false;

        for (String line : lines) {
            if (line.contains("------")) {
                isOptionalMapper = !isOptionalMapper;
            } else if (!isOptionalMapper) {
                notOptionalLines.add(line);
            }
        }

        return notOptionalLines.toArray(new String[0]);
    }


    private MapLineInfo getMapLineInfo(String[] parts) {
        MapLineInfo mapLineInfo = null;
        if (parts.length >= 2) {
            ESegmentType segmentType = getSegmentType(parts[0]);
            List<Integer> positions = getPosition(parts[0], segmentType);
            HL7Position hl7Position = HL7Position.of(segmentType, positions);

            if (parts[1].startsWith("[") && parts[1].endsWith("]")) {
                mapLineInfo = getMapLineInfoWithHardcodedValue(hl7Position, parts[1]);
            } else {
                mapLineInfo = getMapLineInfoWithSegmentPosition(segmentType, hl7Position, parts[1]);
            }
        }
        return mapLineInfo;
    }

    private MapLineInfo getMapLineInfoWithSegmentPosition(ESegmentType segmentType, HL7Position hl7Position, String field) {
        MessagePosition messagePosition;
        if (segmentType.getStructure() != null) {
            messagePosition = MessagePosition.of(segmentType.getStructure() + "." + field);
        } else {
            messagePosition = MessagePosition.of(field);
        }

        return MapLineInfo.of(hl7Position, messagePosition);
    }

    private MapLineInfo getMapLineInfoWithHardcodedValue(HL7Position hl7Position, String hardcodedValue) {
        String value = hardcodedValue.substring(1, hardcodedValue.length() - 1);
        return MapLineInfo.of(hl7Position, value);
    }

    private ESegmentType getSegmentType(String hl7Field) {
        if (hl7Field.startsWith(ESegmentType.MSH.name())) {
            return ESegmentType.MSH;
        } else if (hl7Field.startsWith(ESegmentType.PID.name())) {
            return ESegmentType.PID;
        } else if (hl7Field.startsWith(ESegmentType.PV1.name())) {
            return ESegmentType.PV1;
        } else if (hl7Field.startsWith(ESegmentType.SAC.name())) {
            return ESegmentType.SAC;
        } else if (hl7Field.startsWith(ESegmentType.ORC.name())) {
            return ESegmentType.ORC;
        } else if (hl7Field.startsWith(ESegmentType.MSA.name())) {
            return ESegmentType.MSA;
        } else if (hl7Field.startsWith(ESegmentType.ERR.name())) {
            return ESegmentType.ERR;
        } else if (hl7Field.startsWith(ESegmentType.OBR.name())) {
            return ESegmentType.OBR;
        } else if (hl7Field.startsWith(ESegmentType.OBX.name())) {
            return ESegmentType.OBX;
        }
        return null;
    }

    private List<Integer> getPosition(String hl7Field, ESegmentType segmentType) {
        String[] parts = hl7Field.split("[\\(\\)-]");
        List<Integer> positions = new ArrayList<>();
        for (String part : parts) {
            if (!segmentType.name().equals(part)) {
                if ("X".equals(part)) {
                    positions.add(Integer.parseInt(ANY_NUMBER));
                } else {
                    positions.add(Integer.parseInt(part));
                }
            }
        }
        return positions;
    }
}
