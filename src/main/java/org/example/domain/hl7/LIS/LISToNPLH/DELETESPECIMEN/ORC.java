package org.example.domain.hl7.LIS.LISToNPLH.DELETESPECIMEN;

import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

public class ORC extends org.example.domain.hl7.common.ORC {

    @HL7Position(position = 1)
    private String messageCode;

    @HL7Position(position = 2)
    private String sampleId;

    @HL7Position(position = 4)
    private String specimenId;

    @HL7Position(position = 12)
    private String orderStatus;

    public static ORC Default(String sampleID, String specimenId) {
        ORC orc = (ORC) org.example.domain.hl7.common.ORC.Default(sampleID);

        orc.setMessageCode("CA");
        orc.setActionCode("CA");
        orc.setSpecimenId(specimenId);
        orc.setOrderStatus("DELETE");

        return orc;
    }

    @Override
    public String toString() {
        String value = "ORC|" +
                nullSafe(messageCode) + "|" +         // 1
                nullSafe(sampleId) + "||" +           // 2
                nullSafe(specimenId) + "^SPECIMEN|" + // 4
                "CA||||||||||||||||||||" +            // 5
                nullSafe(orderStatus) + "|";          // 21

        return cleanSegment(value);
    }
}
