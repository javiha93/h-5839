package org.example.domain.hl7.VTG.VTGToNPLH.SLIDEUPDATE;

import org.example.domain.hl7.HL7Segment;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.MSH;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.OBR;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.ORC;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.PID;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.SAC;
import org.example.domain.message.Message;


public class SlideUpdate extends HL7Segment {
    MSH msh;
    PID pid;
    SAC sac;
    ORC orc;
    OBR obr;

    public static SlideUpdate FromMessage(Message message, String blockStatus) {
        SlideUpdate slideUpdate = new SlideUpdate();

        slideUpdate.msh = MSH.FromMessageHeader(message.getHeader());
        slideUpdate.pid = PID.FromPatient(message.getPatient());
        slideUpdate.sac = SAC.FromOrder(message.getOrder());
        slideUpdate.orc = ORC.FromMessage(message.getBlock(), message, blockStatus);
        slideUpdate.obr = OBR.FromMessage(message.getBlock(), message);

        return slideUpdate;
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
