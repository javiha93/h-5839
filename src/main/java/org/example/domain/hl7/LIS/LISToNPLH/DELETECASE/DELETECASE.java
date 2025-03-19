package org.example.domain.hl7.LIS.LISToNPLH.DELETECASE;

import org.example.domain.hl7.HL7Segment;

public class DELETECASE extends HL7Segment {

    MSH msh;
    PID pid;
    OBR obr;
    ORC orc;

    public static DELETECASE Default(String sampleId) {
        DELETECASE deletecase = new DELETECASE();

        deletecase.msh = MSH.Default();
        deletecase.pid = PID.Default();
        deletecase.orc = ORC.Default(sampleId);
        deletecase.obr = OBR.Default(sampleId);

        return deletecase;
    }

    @Override
    public String toString() {
        String caseUpdate = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(orc) + "\n" +
                nullSafe(obr) + "\n";

        return cleanMessage(caseUpdate);
    }
}
