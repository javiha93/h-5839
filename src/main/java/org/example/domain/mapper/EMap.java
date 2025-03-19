package org.example.domain.mapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public interface EMap {

    String getMapper();

    String getMapper(String status);
}
