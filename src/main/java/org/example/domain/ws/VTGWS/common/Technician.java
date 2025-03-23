package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.entity.Specimen;

@Data
@NoArgsConstructor
public class Technician {
    private String firstName;
    private String lastName;
    private String middleName;
    private String userId;

    public static Technician Default(org.example.domain.message.professional.Technician entityTechnician) {
        Technician technician = new Technician();

        technician.firstName = entityTechnician.getFirstName();
        technician.lastName = entityTechnician.getLastName();
        technician.middleName = entityTechnician.getMiddleName();
        technician.userId = entityTechnician.getCode();

        return technician;
    }
}
