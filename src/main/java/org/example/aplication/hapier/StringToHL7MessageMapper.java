package org.example.aplication.hapier;

import org.example.domain.hl7message.ESegmentType;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.HL7Message;
import org.example.domain.hl7message.Segment;
import org.example.domain.hl7message.list.FieldsList;
import org.example.domain.hl7message.list.SegmentsList;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StringToHL7MessageMapper {

    public StringToHL7MessageMapper() {
    }

    List<String> messageSeparators;

    public HL7Message map(String message) {
        List<String> separators = getSeparators(message);
        SegmentsList segments = SegmentsList.of(parseSegments(message, separators));
        return new HL7Message(segments);
    }

    public List<String> getSeparators(String msg) {
        String[] lines = msg.split("\\r?\\n");
        String mshSegment = lines[0];
        String[] fields = mshSegment.split("\\|");
        String separators = fields[1];

        List<String> list = new ArrayList<>();
        list.add("\\|");
        for (char c : separators.toCharArray()) {
            list.add("\\" + c);
        }
        return list;
    }

    public List<Segment> parseSegments(String msg, List<String> separators) {
        List<Segment> segments = new ArrayList<>();
        List<String> lines = Arrays.asList(msg.split("\\r?\\n"));
        for (String line : lines) {
            ESegmentType segmentType = ESegmentType.valueOf(line.substring(0, line.indexOf("|")));
            line = fixMSHSegment(line, segmentType);

            Segment segment = Segment.of(segmentType, parseFields(line, separators, 0));
            segments.add(segment);
        }
        return segments;
    }

    public FieldsList parseFields(String segment, List<String> separators, int level) {
        if (isSupplementalInfo(segment) && level != 0) {
            separators = getSupplementalSeparators();
        }

        List<String> parts = Arrays.asList(segment.split(separators.get(level)));

        if (parts.size() == 1) {
            return null;
        }
        List<Field> fields = new ArrayList<>();
        if (!separators.get(level).equals("\\|")) {
            fields.add(null);
        }
        level = level + 1;

        for (String part : parts) {
            FieldsList fieldsList = parseFields(part, separators, level);
            Field field = Field.of(fields.size(), part, fieldsList);

            fields.add(field);
        }
        return FieldsList.of(fields);
    }

    public String fixMSHSegment(String segment, ESegmentType segmentType) {
        if (segmentType.equals(ESegmentType.MSH)) {
            String[] parts = segment.split("\\|");
            parts[1] = "|";
            return String.join("|", parts);
        }
        return segment;
    }

    private List<String> getSupplementalSeparators() {
        return List.of("\\|", "\\~", "\\^", "\\\\", "\\&");
    }

    private boolean isSupplementalInfo(String field) {
        return (field.toUpperCase().contains("SPECIALINSTRUCTION") ||
                field.toUpperCase().contains("QUALITYISSUE") ||
                field.toUpperCase().contains("RECUT") ||
                field.toUpperCase().contains("GROSSDESCRIPTION") ||
                field.toUpperCase().contains("TISSUEPIECES")
        );
    }
}
