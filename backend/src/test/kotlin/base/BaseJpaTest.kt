package base

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
@AutoConfigureEmbeddedDatabase
class BaseJpaTest
