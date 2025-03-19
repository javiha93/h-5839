package org.example.domain.mapper;

import lombok.Data;
import org.example.domain.hl7message.ESegmentType;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.Segment;
import org.example.domain.message.entity.Order;

import java.util.ArrayList;
import java.util.List;

@Data
public class MapperInfo {
    List<MapLineInfo> mapLines;
    List<MapperInfo> optionalMapperInfos;
    MapperMessageType messageType;


    public void addLine(MapLineInfo mapLine) {
        if (mapLines == null) {
            mapLines = new ArrayList<>();
        }
        this.mapLines.add(mapLine);
    }

    public boolean isEmptyMapperInfo() {
        return (mapLines == null) || (getMapLines().isEmpty());
    }

    public void addOptionalLines(Segment segment) {
        removeOptionalLines();

        for (MapperInfo mapperInfo : optionalMapperInfos) {
            List<String> hardCodedValues = mapperInfo.getHardCodedValues();
            for (String hardCodedValue : hardCodedValues) {
                if (segment.contains(hardCodedValue)) {
                    for (MapLineInfo lineInfo : mapperInfo.getMapLines()) {
                        this.addLine(lineInfo);
                    }
                }
            }
        }
    }

    public void addNonSpecificLines(Segment segment) {
        List<MapLineInfo> mapLineInfos = getMapLinesNonspecificNumber();
        for (MapLineInfo mapLineInfo : mapLineInfos) {
            if (mapLineInfo.getHl7Position().getSegmentType() == segment.getType()) {
                Field field;
                for (Integer position : mapLineInfo.hl7Position.getPositions()) {
                    if (position != -1) {
                        field = segment.getFields().getField(position);
                    } else {
                        //field.
                    }
                }
            }
        }
    }


    public List<MapperInfo> getOptionalMapperInfos(Order order) {
        List<MapperInfo> optionalMapperInfosUsed = new ArrayList<>();
        for (MapperInfo mapperInfo : optionalMapperInfos) {
            List<String> hardCodedValues = mapperInfo.getHardCodedValues();
            for (String hardCodedValue : hardCodedValues) {
                if (order.isFieldFilled(hardCodedValue)) {
                    optionalMapperInfosUsed.add(mapperInfo);
                }
            }
        }

        return optionalMapperInfosUsed;
    }

    private void removeOptionalLines() {
        List<MapLineInfo> linesToRemove = new ArrayList<>();

        for (MapperInfo mapperInfo : optionalMapperInfos) {
            linesToRemove.addAll(mapperInfo.getMapLines());
        }

        this.mapLines.removeAll(linesToRemove);
    }

    private List<MapLineInfo> getMapLinesNonspecificNumber() {
        List<MapLineInfo> linesNonSpecificNumber = new ArrayList<>();

        for (MapLineInfo mapLineInfo : mapLines) {
            for (Integer position : mapLineInfo.getHl7Position().getPositions()) {
                if (position == -1) {
                    linesNonSpecificNumber.add(mapLineInfo);
                }
            }
        }
        return linesNonSpecificNumber;
    }

    public List<String> getHardCodedValues() {
        List<String> hardCodedValues = new ArrayList<>();
        for (MapLineInfo mapLineInfo : mapLines) {
            if ((mapLineInfo.getHardCodedValue() != null) && mapLineInfo.getHardCodedValue().length() > 3) {
                hardCodedValues.add(mapLineInfo.getHardCodedValue());
            }
        }
        return hardCodedValues;
    }
    public List<MapLineInfo> getNotOrderMaps() {
        List<MapLineInfo> maps = new ArrayList<>();
        for (MapLineInfo map : this.getMapLines()) {
            ESegmentType segmentType = map.getHl7Position().getSegmentType();
            if (!segmentType.equals(ESegmentType.ORC) && !segmentType.equals(ESegmentType.OBX) && !segmentType.equals(ESegmentType.OBR)) {
                maps.add(map);
            }
        }
        return maps;
    }

    public List<ESegmentType> getNotOrderSegmentTypes() {
        List<ESegmentType> segmentTypes = new ArrayList<>();
        for (MapLineInfo map : this.getMapLines()) {
            ESegmentType segmentType = map.getHl7Position().getSegmentType();
            if ((!segmentType.equals(ESegmentType.ORC) && !segmentType.equals(ESegmentType.OBX) && !segmentType.equals(ESegmentType.OBR)) && !segmentTypes.contains(segmentType)) {
                segmentTypes.add(segmentType);
            }
        }
        return segmentTypes;
    }

    public List<MapLineInfo> getOrderMaps() {
        List<MapLineInfo> maps = new ArrayList<>();
        for (MapLineInfo map : this.getMapLines()) {
            ESegmentType segmentType = map.getHl7Position().getSegmentType();
            if (segmentType.equals(ESegmentType.ORC) || segmentType.equals(ESegmentType.OBX) || segmentType.equals(ESegmentType.OBR)) {
                maps.add(map);
            }
        }
        return maps;
    }

    public List<ESegmentType> getOrderSegmentTypes() {
        List<ESegmentType> segmentTypes = new ArrayList<>();
        for (MapLineInfo map : this.getMapLines()) {
            ESegmentType segmentType = map.getHl7Position().getSegmentType();
            if ((segmentType.equals(ESegmentType.ORC) || segmentType.equals(ESegmentType.OBX) || segmentType.equals(ESegmentType.OBR)) && !segmentTypes.contains(segmentType)) {
                segmentTypes.add(segmentType);
            }
        }
        return segmentTypes;
    }

    public List<MapLineInfo> getSegmentMap(ESegmentType segmentType) {
        List<MapLineInfo> noIterativeMaps = new ArrayList<>();
        for (MapLineInfo map : this.getMapLines()) {
            if (map.getHl7Position().getSegmentType().equals(segmentType)) {
                noIterativeMaps.add(map);
            }
        }
        return noIterativeMaps;
    }
}

