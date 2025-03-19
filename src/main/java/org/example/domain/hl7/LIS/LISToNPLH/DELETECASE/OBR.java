package org.example.domain.hl7.LIS.LISToNPLH.DELETECASE;

import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

public class OBR extends HL7Segment {

    @HL7Position(position = 2)
    private String sampleId;

    public static OBR Default(String sampleID) {
        OBR obr = new OBR();

        obr.sampleId = sampleID;

        return obr;
    }

    @Override
    public String toString() {
        String value = "OBR||" +
                nullSafe(sampleId) + "|";          // 2

        return cleanSegment(value);
    }
}
