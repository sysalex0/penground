package penguin.penground.config.filter

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.filter.CommonsRequestLoggingFilter

@Configuration
class RequestLoggingFilter {
    @Bean
    fun logFilter(): CommonsRequestLoggingFilter {
        val filter = CommonsRequestLoggingFilter()
        val isIncludePayload = true

        filter.setIncludeQueryString(true)
        filter.setIncludePayload(isIncludePayload)
        filter.setIncludeHeaders(false)
        filter.setBeforeMessagePrefix("Incoming request: ")
        filter.setBeforeMessageSuffix(", passed from servlet")
        filter.setAfterMessagePrefix("Pass request to controller with payload: ")
        if (!isIncludePayload) {
            filter.setAfterMessageSuffix(", hide request payload if exist due to security concern")
        }
        return filter
    }
}
