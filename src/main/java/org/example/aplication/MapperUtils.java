package org.example.aplication;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class MapperUtils {

    public static String getMapper(String root) {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();

        try (InputStream inputStream = classLoader.getResourceAsStream(root);
             InputStreamReader streamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
             BufferedReader reader = new BufferedReader(streamReader)) {

            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append(System.lineSeparator());
            }
            return content.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getMapper(String root, String status) {
        return replaceStatus(getMapper(root), status);
    }


    private static String replaceStatus(String mapper, String status) {
        String[] lines = mapper.split("\\r?\\n");

        String[] firstLineParts = lines[0].split(" ");
        if (firstLineParts.length > 3) {
            firstLineParts[3] = status;
        }
        lines[0] = String.join(" ", firstLineParts);

        return String.join("\n", lines);
    }
}
