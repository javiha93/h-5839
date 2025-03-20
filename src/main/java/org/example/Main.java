
package org.example;

import org.example.domain.hl7.LIS.LISToNPLH.OML21.dto.OML21;
import org.example.domain.hl7.VTG.VTGToNPLH.BLOCKUPDATE.BlockUpdate;
import org.example.domain.message.Message;
import org.example.domain.message.entity.supplementalInfo.SpecialInstruction;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

        Message message = Message.Default("test");
        message.getSpecimen("test;A")
                .addSupplementalInfo(
                        new SpecialInstruction("SpecialInstructionValue"));


        OML21 oml21 = OML21.FromMessage(message);
        BlockUpdate blockUpdate = BlockUpdate.FromMessage(message, "STAINING");


        String oml21String = oml21.toString();
        String blockUpdateString = blockUpdate.toString();

    }
}