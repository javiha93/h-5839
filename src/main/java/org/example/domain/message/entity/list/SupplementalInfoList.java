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
        SupplementalInfo supplementalInfo = new SupplementalInfo();
        List<SupplementalInfo> supplementalInfos = new ArrayList<>();
        supplementalInfos.add(supplementalInfo);

        this.supplementalInfoList = supplementalInfos;
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
            //String actualValue = (String) supplementalInfo.getFieldValue(messagePosition.getChildMessagePosition());
            String actualValue = (String) supplementalInfo.get(messagePosition.getFullMessagePosition());
            boolean isSetteable = true;
            if ((field.equals("qualityIssueType") || field.equals("qualityIssueValue")) && !supplementalInfo.getType().equals("QUALITYISSUE")) {
                isSetteable = false;
            }
            if ((actualValue == null) && (!isSetted) && (isSetteable)) {
                isSetted = true;
                supplementalInfo.setFieldValue(messagePosition.getChildMessagePosition(), value);
            }
        }

        if (!isSetted) {
            SupplementalInfo newSupplementalInfo = new SupplementalInfo();
            newSupplementalInfo.setFieldValue(messagePosition.getChildMessagePosition(), value);
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
