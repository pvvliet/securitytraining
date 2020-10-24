package nl.uitdehoogte.security;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class DependencyConfiguration
{
    @Bean
    @Scope("singleton")
    public ModelMapper getModelMapper()
    {
        return new ModelMapper();
    }
}
