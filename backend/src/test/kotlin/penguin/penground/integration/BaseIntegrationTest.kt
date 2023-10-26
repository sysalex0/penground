package penguin.penground.integration

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import penguin.penground.PengroundApplication

// create an application context containing all the objects
@SpringBootTest(classes = [PengroundApplication::class])
// add a MockMvc instance to the application context
@AutoConfigureMockMvc
abstract class BaseIntegrationTest{
    // get the objectMapper from application context
    @Autowired
    protected lateinit var objectMapper: ObjectMapper
}

