import { Cpf } from "../../../../src/domain/vo/Cpf"

test("Deve validar um cpf com o digito diferente de zero", function () {
	const cpf = "97456321558";
    new Cpf(cpf);
});

test("Deve validar um cpf com o segundo digito zero", function () {
	const cpf = "71428793860";
	new Cpf(cpf);
});

test("Deve validar um cpf com o primeiro digito zero", function () {
	const cpf = "87748248800";
	new Cpf(cpf);
});

test("Não deve validar um cpf com menos de 11 caracteres", function () {
	const cpf = "9745632155";
    expect(() => new Cpf(cpf)).toThrow('Invalid Cpf')
});

test("Não deve validar um cpf com todos os caracteres iguais", function () {
	const cpf = "11111111111";
    expect(() => new Cpf(cpf)).toThrow('Invalid Cpf')
});

test("Não deve validar um cpf com letras", function () {
	const cpf = "97a56321558";
    expect(() => new Cpf(cpf)).toThrow('Invalid Cpf')
});