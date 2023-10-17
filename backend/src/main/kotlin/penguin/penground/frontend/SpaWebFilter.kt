package penguin.penground.frontend

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

@Component
class SpaWebFilter : OncePerRequestFilter() {
    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest, response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val path = request.requestURI
        // 1.not backend request, 2.not static resources or files with file extensions, 3.is frontend page
        if (!path.startsWith("/api") && !path.contains(".") && path.matches("/(.*)".toRegex())) {
            // ensure that the frontend application can handle client-side routing and render the appropriate view based on the requested path
            request.getRequestDispatcher("/").forward(request, response)
            return
        }
        filterChain.doFilter(request, response)
    }
}