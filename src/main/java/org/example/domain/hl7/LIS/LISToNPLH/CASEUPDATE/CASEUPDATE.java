package org.example.domain.hl7.LIS.LISToNPLH.CASEUPDATE;

import org.example.domain.hl7.HL7Segment;

public class CASEUPDATE extends HL7Segment {

    MSH msh;
    PID pid;
    OBR obr;
    ORC orc;

    public static CASEUPDATE Default(String sampleId, String status) {
        CASEUPDATE caseupdate = new CASEUPDATE();

        caseupdate.msh = MSH.Default();
        caseupdate.pid = PID.Default();
        caseupdate.orc = ORC.Default(sampleId, status);
        caseupdate.obr = OBR.Default(sampleId);

        return caseupdate;
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
