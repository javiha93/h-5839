
package org.example.service;

import org.example.domain.hl7.LIS.LISToNPLH.OML21.dto.OML21;
import org.example.domain.message.Message;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public Message generateMessage(String sampleId) {
        return Message.Default(sampleId);
    }
    
    public String generateOML21Message(String sampleId) {
        Message message = Message.Default(sampleId);
        OML21 oml21 = OML21.FromMessage(message);
        return oml21.toString();
    }
}
