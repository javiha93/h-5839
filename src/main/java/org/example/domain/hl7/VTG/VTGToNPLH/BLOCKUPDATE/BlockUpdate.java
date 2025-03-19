package org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE;

import org.example.domain.hl7.HL7Segment;
import org.example.domain.message.Message;


public class BlockUpdate extends HL7Segment {
    MSH msh;
    PID pid;
    SAC sac;
    ORC orc;
    OBR obr;

    public static BlockUpdate FromMessage(Message message, String blockStatus) {
        BlockUpdate blockUpdate = new BlockUpdate();

        blockUpdate.msh = MSH.FromMessageHeader(message.getHeader(), "OUL^R21");
        blockUpdate.pid = PID.FromPatient(message.getPatient());
        blockUpdate.sac = SAC.FromOrder(message.getOrder());
        blockUpdate.orc = ORC.FromMessage(message.getBlock(), message, blockStatus);
        blockUpdate.obr = OBR.FromMessage(message.getBlock(), message);

        return blockUpdate;
    }

    @Override
    public String toString() {
        String blockUpdate = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(sac) + "\n" +
                nullSafe(orc) + "\n" +
                nullSafe(obr) + "\n";

        return cleanMessage(blockUpdate );
    }
}
