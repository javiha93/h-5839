package org.example.domain.mapper;

import lombok.Data;
import org.example.domain.hl7message.Segment;

@Data
public class MapLineInfo {
    HL7Position hl7Position;
    MessagePosition messagePosition;
    String hardCodedValue;


    private MapLineInfo(HL7Position hl7Position, MessagePosition messagePosition, String hardCodedValue) {
        this.hl7Position = hl7Position;
        this.messagePosition = messagePosition;
        this.hardCodedValue = hardCodedValue;
    }

    public static MapLineInfo of(HL7Position hl7Position, MessagePosition messagePosition) {
        return new MapLineInfo(hl7Position, messagePosition, null);
    }

    public static MapLineInfo of(HL7Position hl7Position, String hardCodedValue) {
        return new MapLineInfo(hl7Position, null, hardCodedValue);
    }

    public static MapLineInfo of(HL7Position hl7Position, MessagePosition messagePosition, String hardCodedValue) {
        return new MapLineInfo(hl7Position, messagePosition, hardCodedValue);
    }

    public String getValue(Segment segment) {
        return segment.getFieldValue(this.getHl7Position().getPositions());
    }

    public boolean isMapping(String value) {
        if (messagePosition == null) {
            return false;
        }
        return messagePosition.isMapping(value);
    }

    public String getFullMessagePosition() {
        if (this.messagePosition == null) {
            return null;
        }
        return messagePosition.getFullMessagePosition();
    }

}

