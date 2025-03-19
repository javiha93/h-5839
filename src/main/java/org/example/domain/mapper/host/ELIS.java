package org.example.domain.mapper.host;

import org.example.aplication.MapperUtils;
import org.example.domain.mapper.EMap;

public enum ELIS implements EMap {
    OML21,
    STATUS_UPDATE,
    DELETE_SLIDE,
    ADTA08,
    ACK,
    DELETE_CASE,
    DELETE_SPECIMEN,
    SCAN_SLIDE,
    RESCAN_SLIDE;

    private String genericRoot = "mappers/LIS/";
    @Override
    public String getMapper() {
       return MapperUtils.getMapper(genericRoot + name());
    }

    @Override
    public String getMapper(String status) {
        return MapperUtils.getMapper(genericRoot + name(), status);
    }

}
