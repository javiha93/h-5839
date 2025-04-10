
package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.entity.Specimen;
import org.example.domain.ws.VTGWS.WSSegment;

import java.util.stream.Stream;

@Data
@NoArgsConstructor
public class Technician extends WSSegment {
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

    private boolean isEmpty() {
        return Stream.of(firstName, lastName, middleName, userId)
                .allMatch(value -> value == null || value.trim().isEmpty());
    }

    public String toString(int indentationLevel) {
        String technician = addIndentation(indentationLevel) + "<Technician>\n";

        if (!this.isEmpty()) {
            indentationLevel ++;

            technician += addIndentation(indentationLevel) + "<FirstName>" + firstName + "</FirstName>\n"
                    + addIndentation(indentationLevel) + "<LastName>" + lastName + "</LastName>\n"
                    + addIndentation(indentationLevel) + "<MiddleName>" + middleName + "</MiddleName>\n"
                    + addIndentation(indentationLevel) + "<UserId>" + userId + "</UserId>\n";

            indentationLevel --;
        }

        technician += addIndentation(indentationLevel) + "</Technician>";
        return technician;
    }
}
