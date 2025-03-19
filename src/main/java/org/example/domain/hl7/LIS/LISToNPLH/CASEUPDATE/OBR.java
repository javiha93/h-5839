package org.example.domain.hl7.LIS.LISToNPLH.CASEUPDATE;

public class OBR extends org.example.domain.hl7.common.OBR {

    public static OBR Default(String sampleID) {
        OBR obr = new OBR();

        obr.setSampleId(sampleID);

        return obr;
    }

    @Override
    public String toString() {
        return toStringDeleteCase();
    }
}
