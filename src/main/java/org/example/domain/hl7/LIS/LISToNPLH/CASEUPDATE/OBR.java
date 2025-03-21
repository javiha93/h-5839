package org.example.domain.hl7.LIS.LISToNPLH.CASEUPDATE;

import org.example.domain.message.entity.Order;

public class OBR extends org.example.domain.hl7.common.OBR {

    public static OBR Default(String sampleID) {
        OBR obr = new OBR();

        obr.setSampleId(sampleID);

        return obr;
    }

    public static OBR FromMessage(Order order) {
        return (OBR) FromMessage(order, new OBR());
    }

    @Override
    public String toString() {
        return toStringDeleteCase();
    }
}
