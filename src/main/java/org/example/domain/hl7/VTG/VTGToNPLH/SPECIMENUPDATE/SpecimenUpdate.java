package org.example.domain.hl7.VTG.VTGToNPLH.SPECIMENUPDATE;

import org.example.domain.hl7.HL7Segment;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.MSH;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.OBR;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.ORC;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.PID;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.SAC;
import org.example.domain.message.Message;


public class SpecimenUpdate extends HL7Segment {
    MSH msh;
    PID pid;
    SAC sac;
    ORC orc;
    OBR obr;

    public static SpecimenUpdate FromMessage(Message message, String blockStatus) {
        SpecimenUpdate specimenUpdate = new SpecimenUpdate();

        specimenUpdate.msh = MSH.FromMessageHeader(message.getHeader());
        specimenUpdate.pid = PID.FromPatient(message.getPatient());
        specimenUpdate.sac = SAC.FromOrder(message.getOrder());
        specimenUpdate.orc = ORC.FromMessage(message.getBlock(), message, blockStatus);
        specimenUpdate.obr = OBR.FromMessage(message.getBlock(), message);

        return specimenUpdate;
    }

    @Override
    public String toString() {
        String slideUpdate = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(sac) + "\n" +
                nullSafe(orc) + "\n" +
                nullSafe(obr) + "\n";

        return cleanMessage(slideUpdate );
    }
}
