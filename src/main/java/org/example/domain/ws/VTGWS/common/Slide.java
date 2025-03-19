package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.entity.Specimen;

@NoArgsConstructor
@Data
public class Slide {

    private String barcode;
    private String sequence;
    private String slideComments;
    private StainProtocol stainProtocol;
    public static Slide Default(org.example.domain.message.entity.Slide entitySlide) {
        Slide slide = new Slide();

        slide.barcode = entitySlide.getId();
        slide.sequence = entitySlide.getSequence();
        slide.stainProtocol = StainProtocol.Default(entitySlide.getStainProtocol());

        return slide;
    }
}
