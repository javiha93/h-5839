
package org.example.domain.message.entity.list;

import lombok.Data;
import org.example.domain.mapper.MessagePosition;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.list.FieldsList;
import org.example.domain.message.Reflection;
import org.example.domain.message.entity.SupplementalInfo;

import java.util.ArrayList;
import java.util.List;

@Data
public class SupplementalInfoList extends Reflection implements Cloneable {
    private List<SupplementalInfo> supplementalInfoList;

    public SupplementalInfoList() {
        // Initialize with an empty ArrayList but no default items
        this.supplementalInfoList = new ArrayList<>();
    }
    
    @Override
    public SupplementalInfoList clone() {
        try {
            SupplementalInfoList cloned = (SupplementalInfoList) super.clone();
            if (supplementalInfoList == null) {
                return cloned;
            }
            List<SupplementalInfo> clonedSupplementalInfoList = new ArrayList<>();
            for (SupplementalInfo supplementalInfo : this.supplementalInfoList) {
                clonedSupplementalInfoList.add(supplementalInfo.clone());
            }
            cloned.setSupplementalInfoList(clonedSupplementalInfoList);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Cloning not supported for SupplementalInfoList", e);
        }
    }

    public void manageSupplementalInfo(MessagePosition messagePosition, String value) {
        String field = messagePosition.getChildMessagePosition().getValue();
        boolean isSetted = false;
        for(SupplementalInfo supplementalInfo : supplementalInfoList) {
            String actualValue = (String) supplementalInfo.get(messagePosition.getFullMessagePosition());
            boolean isSetteable = true;
            
            // Check if the field is related to quality issues and if the current supplemental info is of the right type
            if ((field.equals("qualityIssueType") || field.equals("qualityIssueValue") || 
                 field.equals("optionalType") || field.equals("optionalValue")) && 
                !supplementalInfo.getType().equals("QUALITYISSUE")) {
                isSetteable = false;
            }
            
            if ((actualValue == null) && (!isSetted) && (isSetteable)) {
                isSetted = true;
                supplementalInfo.setFieldValue(messagePosition.getChildMessagePosition(), value);
                
                // For QUALITYISSUE, when setting optionalValue, automatically set optionalType to RESOLUTION
                if (field.equals("optionalValue") && supplementalInfo.getType().equals("QUALITYISSUE")) {
                    supplementalInfo.setQualityIssueType("RESOLUTION");
                    supplementalInfo.setQualityIssueValue(value);
                }
            }
        }

        if (!isSetted) {
            SupplementalInfo newSupplementalInfo = new SupplementalInfo();
            newSupplementalInfo.setFieldValue(messagePosition.getChildMessagePosition(), value);
            
            // For QUALITYISSUE with optionalValue, set qualityIssueType to RESOLUTION
            if (field.equals("optionalValue")) {
                newSupplementalInfo.setType("QUALITYISSUE");
                newSupplementalInfo.setQualityIssueType("RESOLUTION");
                newSupplementalInfo.setQualityIssueValue(value);
            }
            
            supplementalInfoList.add(newSupplementalInfo);
        }
    }

    public Field supplementalToField() {
        List<Field> supplementalFields = new ArrayList<>();

        for (SupplementalInfo supplementalInfo : supplementalInfoList) {
            FieldsList fieldsList = supplementalInfo.supplementalToField();
            Field supp = Field.of(supplementalInfoList.indexOf(supplementalInfo) + 1,"", fieldsList);
            supplementalFields.add(supp);
        }
        FieldsList fieldsList = FieldsList.of(supplementalFields);
        return Field.of(47, "", fieldsList);
    }
}
