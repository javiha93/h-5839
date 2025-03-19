package org.example;


import org.example.aplication.hapier.Hapier;
import org.example.domain.hl7.LIS.LISToNPLH.OML21.dto.OML21;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.BlockUpdate;
import org.example.domain.mapper.host.ELIS;
import org.example.domain.message.Message;
import org.example.domain.message.conditions.EStatus;
import org.example.domain.message.entity.supplementalInfo.SpecialInstruction;

public class Main {
    public static void main(String[] args) {

        Message message = Message.Default("CASE-eb4089cd1a7d45");
        message.getSpecimen("CASE-eb4089cd1a7d45;A")
                .addSupplementalInfo(
                        new SpecialInstruction("SpecialInstructionValue"));


        OML21 oml21 = OML21.FromMessage(message);
        BlockUpdate blockUpdate = BlockUpdate.FromMessage(message, "STAINING");


        String oml21String = oml21.toString();
        String blockUpdateString = blockUpdate.toString();


    }
}