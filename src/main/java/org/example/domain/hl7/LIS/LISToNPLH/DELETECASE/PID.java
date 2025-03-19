package org.example.domain.hl7.LIS.LISToNPLH.DELETECASE;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

@Data
@NoArgsConstructor
public class PID extends org.example.domain.hl7.common.PID {

    public static PID Default() {
        return (PID) org.example.domain.hl7.common.PID.Default();
    }

    @Override
    public String toString() {
        String value = "PID|||" +
                nullSafe(getExtPatientID()) + "||" +                                                                                              // 3
                nullSafe(getLastName()) + "^" + nullSafe(getFirstName()) + "^" + nullSafe(getMiddleName()) + "|" +                                          // 5
                nullSafe(getSecondSurname()) + "|" +                                                                                              // 6
                nullSafe(getDateOfBirth()) + "|" +                                                                                                // 7
                nullSafe(getSex()) + "|||" +                                                                                                      // 8
                nullSafe(getAddress1()) + "^^" + nullSafe(getCity()) + "^" + nullSafe(getState()) + "^" + nullSafe(getZip()) + "^" + nullSafe(getCountry()) + "||" +  // 11
                "^^^^^^^^^^^^" + nullSafe(getMobileTel()) + "|";                                                                                  // 13
        return cleanSegment(value);
    }
}
