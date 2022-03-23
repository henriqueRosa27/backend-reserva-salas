--############################
--          TABELAS
--#############################

CREATE TABLE equipamento (
	id serial4 NOT NULL PRIMARY KEY,
	nome_equipamento varchar(30) NOT NULL,
	quantidade int4 NOT NULL DEFAULT 0,
	status bool NOT NULL DEFAULT true
);

CREATE TABLE predio (
	id serial4 NOT NULL PRIMARY KEY,
	nome varchar(50) NOT NULL,
	status bool NOT NULL DEFAULT true
);

CREATE TABLE sala (
	id serial4 NOT NULL PRIMARY KEY,
	nome varchar(50) NOT NULL,
	capacidade int2 NOT NULL DEFAULT 0,
	andar int2 NOT NULL DEFAULT 1,
	status bool NOT NULL DEFAULT true,
	equipamentos varchar(500) NOT NULL,
	salas_especiais varchar(150) NULL,
	inicio_intervalo varchar(10) NOT NULL,
	fim_intervalo varchar(10) NOT NULL,
	caracteristicas varchar(500) NULL,
	predio_id serial4 NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES sala(id)
);

CREATE TABLE agendamento (
	id serial4 NOT NULL PRIMARY KEY,
	data_inicial timestamp NOT NULL,
	data_final timestamp NOT NULL,
	responsavel varchar(100) NOT NULL,
	status bool NOT NULL DEFAULT true,
	observacao varchar(500) NOT NULL,
	nome_evento varchar(100) NOT NULL,
	quantidade_pessoas int4 NOT NULL,
	sala_id serial4 NOT NULL,
    FOREIGN KEY (sala_id) REFERENCES sala(id)
);

CREATE TABLE agendamento_equipamento (
	id serial4 NOT NULL PRIMARY KEY,
	agendamento_id serial4 NOT NULL,
	equipamento_id serial4 NOT NULL,
	FOREIGN KEY (agendamento_id) REFERENCES agendamento(id),
	FOREIGN KEY (equipamento_id) REFERENCES equipamento(id)
);