export default new LeaveManagementPage()

class LeaveManagementPage {
    elements = {
        usernameInput: () => cy.get('#username'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login'),
        leaveTypeDropdown: () => cy.get('#leaveType'),
        startDateInput: () => cy.get('#startDate'),
        endDateInput: () => cy.get('#endDate'),
        submitButton: () => cy.get('#submit'),
        successToast: () => cy.get('.toast-success'),
        errorMessage: () => cy.get('.error-message')
    }

    login(username, password) {
        this.elements.usernameInput().type(username)
        this.elements.passwordInput().type(password)
        this.elements.loginButton().click()
    }

    applyLeave(leaveType, startDate, endDate) {
        this.elements.leaveTypeDropdown().select(leaveType)
        this.elements.startDateInput().type(startDate)
        this.elements.endDateInput().type(endDate)
        this.elements.submitButton().click()
    }

    verifySuccessMessage(message) {
        this.elements.successToast().should('contain', message)
    }

    verifyErrorResponse(statusCode, errorText) {
        cy.intercept('POST', '/api/leave/apply').as('leaveRequest')
        this.elements.submitButton().click()
        cy.wait('@leaveRequest').its('response.statusCode').should('eq', statusCode)
        this.elements.errorMessage().should('contain', errorText)
    }
}