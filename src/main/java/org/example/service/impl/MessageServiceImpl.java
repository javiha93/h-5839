package org.example.service.impl;

import org.example.domain.hl7.LIS.LISToNPLH.DELETESPECIMEN.DELETESPECIMEN;
import org.example.domain.mapper.EMap;
import org.example.domain.mapper.host.ELIS;
import org.example.domain.message.Message;
import org.example.domain.message.entity.Specimen;
import org.example.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    @Override
    public Message generateMessage(String sampleId) {
        Message message = new Message();
        message.setChannelType("HL7");
        message.setRegisterTime("registerTime");

        ELIS map = ELIS.OML21;
        try {
            map = ELIS.valueOf("OML21");
        } catch (Exception e) {
            System.out.println("Enum not found " + e.getMessage());
        }

        return message;
    }

    @Override
    public String convertMessage(Message message, String messageType) {
        EMap map = ELIS.OML21;
        try {
            map = ELIS.valueOf(messageType);
        } catch (Exception e) {
            System.out.println("Enum not found " + e.getMessage());
        }

        return map.getMapper();
    }

    @Override
    public String convertSpecimenMessage(Message message, String messageType, Specimen specimen) {
        if ("DELETE_SPECIMEN".equals(messageType)) {
            return DELETESPECIMEN.FromMessage(message, specimen).toString();
        }
        
        // Fall back to regular conversion if no special handling is needed
        return convertMessage(message, messageType);
    }
}
