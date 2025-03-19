package org.example.domain.hl7.LIS.LISToNPLH.DELETECASE;

import org.example.domain.hl7.HL7Position;

public class ORC extends org.example.domain.hl7.common.ORC {

    public static ORC Default(String sampleID) {

        ORC orc = (ORC) org.example.domain.hl7.common.ORC.Default(sampleID);

        orc.setMessageCode("CA");
        orc.setActionCode("CA");
        orc.setOrderStatus("DELETE");

        return orc;
    }

    @Override
    public String toString() {
        return toStringCaseUpdate();
    }
}
