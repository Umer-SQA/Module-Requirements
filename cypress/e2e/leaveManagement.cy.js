import LeaveManagementPage from '../pages/leaveManagementPage'

describe('Leave Management Tests', () => {
    beforeEach(() => {
        cy.visit('/')
        LeaveManagementPage.login('employee@company.com', 'password123')
    })

    // Positive Tests
    it('TC-01: Submit Annual Leave (Valid)', () => {
        LeaveManagementPage.applyLeave('Annual Leave', '2024-12-01', '2024-12-05')
        LeaveManagementPage.verifySuccessMessage('Leave submitted successfully')
    })

    it('TC-02: Half-day Leave Application', () => {
        LeaveManagementPage.elements.leaveTypeDropdown().select('Annual Leave')
        LeaveManagementPage.elements.startDateInput().type('2024-12-10')
        cy.get('#halfDay').check('AM')
        LeaveManagementPage.elements.submitButton().click()
        LeaveManagementPage.verifySuccessMessage('Half-day leave submitted')
    })

    // Negative Tests
    it('TC-03: Insufficient Balance', () => {
        LeaveManagementPage.applyLeave('Sick Leave', '2024-12-10', '2024-12-20')
        LeaveManagementPage.verifyErrorResponse(400, 'Insufficient leave balance')
    })

    // Boundary Tests
    it('TC-04: Minimum 1-hour Gap Validation', () => {
        LeaveManagementPage.applyLeave('Casual Leave', '2024-12-15T13:00', '2024-12-15T14:00')
        LeaveManagementPage.elements.submitButton().click()
        LeaveManagementPage.verifyErrorResponse(400, 'Minimum 1-hour gap required')
    })
})