package org.example.domain.hl7.LIS.LISToNPLH.DELETESLIDE;

import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

public class ORC extends org.example.domain.hl7.common.ORC {


    public static ORC Default(String sampleID, String slideId) {
        ORC orc = (ORC) org.example.domain.hl7.common.ORC.Default(sampleID);

        orc.setMessageCode("CA");
        orc.setActionCode("CA");
        orc.setSlideId(slideId);
        orc.setSlideStatus("DELETE");

        return orc;
    }

    @Override
    public String toString() {
        return toStringSlideUpdate();
    }
}
