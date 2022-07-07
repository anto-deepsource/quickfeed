import NavBar from "../components/NavBar"
import React from "react"
import { User } from "../../proto/qf/types/types_pb"
import { createOvermindMock } from "overmind"
import { config } from "../overmind"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import { Provider } from "overmind-react"
import { render, screen } from "@testing-library/react"


describe("Visibility when logged in", () => {

    const history = createMemoryHistory()
    const mockedOvermind = createOvermindMock(config, (state) => {
        state.self = new User().setId(1).setName("Test User").setIsadmin(true).toObject()
    })

    beforeEach(() => {
        render(
            <Provider value={mockedOvermind}>
                <Router history={history}>
                    <NavBar />
                </Router>
            </Provider>
        )
    })

    it("Sign in is not visible when logged in", () => {
        const signIn = "Sign in with"
        const link = screen.getAllByRole("link")
        link.forEach(element => {
            expect(element.textContent).not.toEqual(signIn)
        })
    })

    it("When user is logged in, hamburger menu should appear", () => {
        const hamburger = "☰"
        const element = screen.getByText(hamburger)
        expect(element.tagName).toEqual("SPAN")
    })
})
