
package org.example.service;

import org.example.domain.message.Message;
import org.example.domain.message.entity.Specimen;

public interface MessageService {
    Message generateMessage(String sampleId);
    String convertMessage(Message message, String messageType);
    String convertSpecimenMessage(Message message, String messageType, Specimen specimen);
}
