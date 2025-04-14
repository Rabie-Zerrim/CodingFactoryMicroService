package tn.esprit.esponline.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.config.client.ConfigClientProperties;
import org.springframework.cloud.config.client.ConfigServicePropertySourceLocator;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@RefreshScope  // Add this if you want refresh capabilities
@Configuration
public class ConfigServerInitializer {

    @Value("${spring.cloud.config.uri:http://localhost:8888}")
    private String configServerUrl;

    @Value("${spring.cloud.config.username:admin}")
    private String username;

    @Value("${spring.cloud.config.password:admin123}")
    private String password;

    @Bean
    public CommandLineRunner forceConfigServerLoad(Environment env) {
        return args -> {
            ConfigClientProperties clientProperties = new ConfigClientProperties(env);
            clientProperties.setUri(new String[]{configServerUrl});
            clientProperties.setUsername(username);
            clientProperties.setPassword(password);
            clientProperties.setFailFast(true);

            ConfigServicePropertySourceLocator locator = new ConfigServicePropertySourceLocator(clientProperties);
            locator.locate(env);
        };
    }
}