package org.example.domain.hl7.LIS.LISToNPLH.DELETESPECIMEN;

import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

public class OBR extends org.example.domain.hl7.common.OBR {

    public static OBR Default(String specimenId) {
        OBR obr = new OBR();

        obr.setSpecimenID(specimenId);

        return obr;
    }

    @Override
    public String toString() {
        return toStringDeleteSpecimen();
    }
}
