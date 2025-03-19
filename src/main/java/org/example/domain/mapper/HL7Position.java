package org.example.domain.mapper;

import lombok.Data;
import org.example.domain.hl7message.ESegmentType;

import java.util.List;

@Data
public class HL7Position {
    ESegmentType segmentType;
    List<Integer> positions;

    private HL7Position(ESegmentType segmentType, List<Integer> positions) {
        this.segmentType = segmentType;
        this.positions = positions;
    }

    public static HL7Position of(ESegmentType segmentType, List<Integer> positions) {
        return new HL7Position(segmentType, positions);
    }
}
