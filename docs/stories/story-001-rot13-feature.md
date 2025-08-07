# Story-001: Add ROT13 Cryptography Option

**Status:** Backend Complete

## User Story

As a user of the Penground application, I want to be able to encrypt and decrypt my text using the ROT13 cipher so that I can have another fun and classic method for obfuscating my messages.

## Acceptance Criteria

1.  **API Contract Updated**: The `openapi/api_description.yaml` file must be updated to include `ROT13` as a valid option for the `CryptographyAlgorithm` enum.
2.  **Backend Implementation**:
    *   A new service, `Rot13CryptographyAlgorithmService`, must be created that correctly implements the ROT13 algorithm for encryption and decryption.
    *   The `CryptographyAlgorithmFactory` must be updated to recognize and provide the `ROT13` service.
    *   The backend must have unit tests that verify the correctness of the ROT13 implementation.
3.  **Frontend Implementation**:
    *   The frontend API client must be regenerated to include the `ROT13` algorithm option.
    *   The `CryptographySwitch` component must display "ROT13" as a selectable option in the user interface.
    *   When "ROT13" is selected, the application must successfully call the backend to perform encryption and decryption.
4.  **End-to-End Verification**: The entire feature works end-to-end. A user can select "ROT13", enter text, encrypt it, and decrypt the result back to the original text without errors.
5.  **Documentation**: The `brownfield-architecture.md` document is updated to reflect the contract-first development process. (Already completed)

## Tasks

### Backend

- [x] **Task 1: Update API Contract**
    - [x] Add `ROT13` to the `enum` under `CryptographyAlgorithm` in `openapi/api_description.yaml`.
- [x] **Task 2: Generate Code**
    - [x] Run the Gradle `openApiGenerate` task to create the necessary server-side stubs.
- [x] **Task 3: Implement ROT13 Service**
    - [x] Create `Rot13CryptographyAlgorithmService.kt`.
    - [x] Implement the `CryptographyAlgorithmService` interface.
    - [x] Add logic for ROT13 encryption/decryption.
- [x] **Task 4: Update Factory**
    - [x] Add a new `ROT13` enum value in `CryptographyAlgorithmFactory.kt`.
    - [x] Register the `Rot13CryptographyAlgorithmService` in the factory.
- [x] **Task 5: Write Backend Tests**
    - [x] Create `Rot13CryptographyAlgorithmServiceTest.kt`.
    - [x] Write unit tests to verify the ROT13 logic.
- [x] **Task 5a: Write Integration Tests**
    - [x] Create `CryptographyApiControllerTest.kt` with ROT13 tests.

### Frontend

- [x] **Task 6: Generate API Client**
    - [x] Run `yarn openapi` to update the frontend client.
- [x] **Task 7: Update UI Component**
    - [x] Modify `CryptographySwitch.tsx` to include "ROT13" as an option.
- [x] **Task 8: End-to-End Manual Test**
    - [x] Run the application and perform a full manual test of the feature.

## QA Results

### End-to-End Manual Test Steps:

1.  **Start Backend Server:** Ensure the backend server is running using the command: `java -jar backend/build/libs/backend-0.0.1-SNAPSHOT.jar --bundle=true`. This will also serve the frontend static content.
2.  **Access Application:** Open your web browser and navigate to the application's URL (e.g., `http://localhost:8080` or the configured backend port).
3.  **Select ROT13:** On the cryptography page, locate the algorithm selection dropdown/switch and select "ROT13".
4.  **Encrypt Text:**
    *   Enter a sample text into the input field (e.g., "Hello World").
    *   Click the "Encrypt" button.
    *   Verify that the output field displays the ROT13 encrypted text (e.g., "Uryyb Jbeyq").
5.  **Decrypt Text:**
    *   Copy the encrypted text from the output field.
    *   Paste the encrypted text into the input field.
    *   Click the "Decrypt" button.
    *   Verify that the output field displays the original text (e.g., "Hello World").
6.  **Test Edge Cases (Optional but Recommended):**
    *   Test with numbers and special characters (ROT13 only affects letters).
    *   Test with an empty string.
    *   Test with a very long string.
7.  **Observe for Errors:** Throughout the process, monitor the browser console and network requests for any errors.

**Manual Test Results:**

Manual testing performed by the user. All steps verified successfully.