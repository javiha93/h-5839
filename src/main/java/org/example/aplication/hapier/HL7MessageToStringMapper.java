package org.example.aplication.hapier;

import org.example.domain.hl7message.ESegmentType;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.HL7Message;
import org.example.domain.hl7message.Segment;

import java.util.Arrays;
import java.util.List;

public class HL7MessageToStringMapper {

    List<String> SEPARATORS = List.of("|","^", "~", "\\", "&");

    public String map(HL7Message message) {
        StringBuilder messageBuilder = new StringBuilder();

        for (Segment segment : message.getAllSegment()) {
            String segmentLine = buildSegmentString(segment);
            if (segment.getType().equals(ESegmentType.MSH)) {
                segmentLine = fixMSHSegment(segmentLine);
            }
            messageBuilder.append(segmentLine);
        }

        return messageBuilder.toString();
    }

    private String buildSegmentString(Segment segment) {
        StringBuilder messageBuilder = new StringBuilder();

        int maxPosition = getMaxPosition(segment);
        String[] segmentFields = new String[maxPosition + 1];

        //Add segment type
        segmentFields[0] = segment.getType().name();

        for (Field field : segment.getAllFields()) {
            segmentFields[field.getPosition()] = buildFieldString(field, 1);
        }

        for (int i = 0; i <= maxPosition; i++) {
            if (segmentFields[i] != null) {
                messageBuilder.append(segmentFields[i]);
            }
            if (i < maxPosition) {
                messageBuilder.append("|");
            }
        }
        messageBuilder.append("|\n");
        return messageBuilder.toString();
    }

    private String buildFieldString(Field field, int level) {
        if (field.getFields() != null) {
            int maxSubFieldPosition = getMaxSubFieldPosition(field);
            String[] subFields = new String[maxSubFieldPosition + 1];

            for (Field subField : field.getFields().getFields()) {
                if (subField.getFields() != null) {
                    subFields[subField.getPosition() - 1] = buildFieldString(subField, level + 1);
                } else if (subField.getValue() != null) {
                    subFields[subField.getPosition() - 1] = subField.getValue();
                }
            }
            return joiner(subFields, level);
        } else {
            return field.getValue();
        }
    }

    private int getMaxPosition(Segment segment) {
        int maxPosition = 0;
        for (Field field : segment.getAllFields()) {
            if (field.getPosition() > maxPosition) {
                maxPosition = field.getPosition();
            }
            if (field.getFields() != null) {
                for (Field subField : field.getFields().getFields()) {
                    if (subField.getPosition() > maxPosition) {
                        maxPosition = subField.getPosition();
                    }
                }
            }
        }
        return maxPosition;
    }

    private int getMaxSubFieldPosition(Field field) {
        int maxPosition = 0;
        if (field.getFields() != null) {
            for (Field subField : field.getFields().getFields()) {
                if (subField.getPosition() > maxPosition) {
                    maxPosition = subField.getPosition();
                }
            }
        }
        return maxPosition;
    }

    private String joiner(String[] subFields, int level) {
        StringBuilder subFieldStringBuilder = new StringBuilder();
        String separator = getSeparator(subFields, level);

        for (String subField : subFields) {
            if (subFieldStringBuilder.length() > 0) {
                subFieldStringBuilder.append(separator);
            }
            if (subField != null) {
                subFieldStringBuilder.append(subField);
            }
        }
        return removeExtraSeparators(subFieldStringBuilder.toString(), separator);
    }

    private String getSeparator(String[] subFields, int level) {
        String separator;
        if (level == 2) {
            separator = SEPARATORS.get(level - 1);
        } else {
            separator = SEPARATORS.get(level);
        }
        List<String> values = Arrays.asList(subFields);
        for (String value : values) {
            if ((value != null) && (value.contains(separator))) {
                separator = SEPARATORS.get(level + 1);
            }
        }
        return separator;
    }

    private String fixMSHSegment(String line) {
        return line.replace("MSH||", "MSH" + String.join("", SEPARATORS));
    }

    private String removeExtraSeparators(String field, String separator) {
        int length = field.length();
        while (length > 0 && field.charAt(length - 1) == separator.charAt(0)) {
            length--;
        }
        return field.substring(0, length);
    }
}
