package base

import jakarta.servlet.Filter
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.test.web.servlet.setup.StandaloneMockMvcBuilder

abstract class BaseFilterTest {
    fun <T> getMockMvc(controller: T, filter: Filter): MockMvc {
        return MockMvcBuilders
            .standaloneSetup(controller)
            .addFilter<StandaloneMockMvcBuilder>(filter)
            .build()
    }
}
