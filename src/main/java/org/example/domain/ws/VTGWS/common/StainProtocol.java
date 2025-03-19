package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class StainProtocol {
    String protocolName;
    String protocolDescription;
    String protocolNumber;


    public static StainProtocol Default(org.example.domain.message.entity.StainProtocol entityStainProtocol) {
        StainProtocol stainProtocol = new StainProtocol();

        stainProtocol.protocolName = entityStainProtocol.getName();
        stainProtocol.protocolDescription = entityStainProtocol.getDescription();
        stainProtocol.protocolNumber = entityStainProtocol.getNumber();

        return stainProtocol;
    }
}
