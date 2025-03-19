package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.entity.Order;
import org.example.domain.message.entity.Specimen;

@Data
@NoArgsConstructor
public class Block {

    private String barcode;
    private String sequence;
    private String TissueSubTypeDescription;
    private String TissueSubTypeName;

    public static Block Default(org.example.domain.message.entity.Block entityBlock, Specimen specimen) {
        Block block = new Block();

        block.barcode = entityBlock.getId();
        block.sequence = entityBlock.getSequence();
        block.TissueSubTypeDescription = specimen.getProcedure().getTissue().getSubtypeDescription();
        block.TissueSubTypeName = specimen.getProcedure().getTissue().getType();

        return  block;
    }
}
