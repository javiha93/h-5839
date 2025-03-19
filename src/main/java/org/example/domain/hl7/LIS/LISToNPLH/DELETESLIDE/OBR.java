package org.example.domain.hl7.LIS.LISToNPLH.DELETESLIDE;

import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

public class OBR extends org.example.domain.hl7.common.OBR {

    public static OBR Default(String slideId) {
        OBR obr = new OBR();

        obr.setSlideID(slideId);

        return obr;
    }

    @Override
    public String toString() {
        return toStringDeleteSlide();
    }
}
