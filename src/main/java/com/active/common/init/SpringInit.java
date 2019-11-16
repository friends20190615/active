package com.active.common.init;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.concurrent.atomic.AtomicInteger;


public class SpringInit implements ServletContextListener {

    private static WebApplicationContext springContext;
    
    public SpringInit() {
        super();
    }

    public static AtomicInteger TGCOUNT = new AtomicInteger(0);
    
    @Override
    public void contextInitialized(ServletContextEvent event) {
        springContext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
    }
    

    @Override
    public void contextDestroyed(ServletContextEvent event) {
    }
    
    public static ApplicationContext getApplicationContext() {
        return springContext;
    }
}
