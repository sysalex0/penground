package penguin.penground.model.key

import java.io.Serializable

class SystemVariableId(
    private val variableType: String,
    private val variableCode: String
) : Serializable