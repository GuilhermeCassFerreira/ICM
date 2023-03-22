-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- [ICM-WEB].dbo.Query definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.Query;

CREATE TABLE [ICM-WEB].dbo.Query (
	CNPJ varchar(14) COLLATE Latin1_General_CI_AS NOT NULL,
	de_empresa varchar(100) COLLATE Latin1_General_CI_AS NULL
);


-- [ICM-WEB].dbo.TB_CODIGO_SINALIZACAO_VERTICAL definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_CODIGO_SINALIZACAO_VERTICAL;

CREATE TABLE [ICM-WEB].dbo.TB_CODIGO_SINALIZACAO_VERTICAL (
	id_codigo_sinal_vertical varchar(10) COLLATE Latin1_General_CI_AS NOT NULL,
	de_codigo_sinal_vertical varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	img_sinal_vertical varchar(150) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK_TB_CODIGO_SINALIZACAO_VERTICAL PRIMARY KEY (id_codigo_sinal_vertical)
);


-- [ICM-WEB].dbo.TB_MALHA_TEMP definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_MALHA_TEMP;

CREATE TABLE [ICM-WEB].dbo.TB_MALHA_TEMP (
	id_malha_temp int IDENTITY(1,1) NOT NULL,
	sigla_uf varchar(2) COLLATE Latin1_General_CI_AS NOT NULL,
	rodovia varchar(6) COLLATE Latin1_General_CI_AS NOT NULL,
	sentido varchar(1) COLLATE Latin1_General_CI_AS NOT NULL,
	num_faixas int NOT NULL,
	superficie varchar(15) COLLATE Latin1_General_CI_AS NOT NULL,
	id_num_contrato int NOT NULL,
	ids_relacionados text COLLATE Latin1_General_CI_AS NOT NULL,
	km_inicial decimal(8,2) NOT NULL,
	km_final decimal(8,2) NOT NULL,
	CONSTRAINT PK_TB_MALHA_TEMP PRIMARY KEY (id_malha_temp)
);


-- [ICM-WEB].dbo.TB_PERFIS_USUARIOS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_PERFIS_USUARIOS;

CREATE TABLE [ICM-WEB].dbo.TB_PERFIS_USUARIOS (
	id_perfil_usuarios int IDENTITY(1,1) NOT NULL,
	de_perfil_usuarios varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	indicadores tinyint NOT NULL,
	avaliacoes_leitura tinyint NOT NULL,
	avaliacoes_escrita tinyint NOT NULL,
	contratos_leitura tinyint NOT NULL,
	contratos_escrita tinyint NOT NULL,
	unifilar tinyint NOT NULL,
	atlas tinyint NOT NULL,
	analise tinyint NOT NULL,
	usuarios_leitura tinyint NOT NULL,
	usuarios_escrita tinyint NOT NULL,
	exportar tinyint NOT NULL,
	grupos_usuarios_leitura tinyint NOT NULL,
	grupos_usuarios_escrita tinyint NOT NULL,
	perfis_usuarios_leitura tinyint NOT NULL,
	perfis_usuarios_escrita tinyint NOT NULL,
	malhas_leitura tinyint NOT NULL,
	malhas_escrita tinyint NOT NULL,
	CONSTRAINT PK__TB_USUAR__3213E83FD6F67716 PRIMARY KEY (id_perfil_usuarios)
);


-- [ICM-WEB].dbo.TB_REGIAO definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_REGIAO;

CREATE TABLE [ICM-WEB].dbo.TB_REGIAO (
	id_regiao int IDENTITY(1,1) NOT NULL,
	nome_regiao varchar(15) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK_TB_REGIAO PRIMARY KEY (id_regiao)
);


-- [ICM-WEB].dbo.TB_RODOVIAS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_RODOVIAS;

CREATE TABLE [ICM-WEB].dbo.TB_RODOVIAS (
	br varchar(3) COLLATE Latin1_General_CI_AS NOT NULL,
	uf varchar(3) COLLATE Latin1_General_CI_AS NOT NULL,
	km_inicial numeric(10,3) NOT NULL,
	km_final numeric(10,3) NOT NULL,
	id_rodovia int IDENTITY(0,1) NOT NULL,
	extensao numeric(38,0) NOT NULL,
	geom geometry NOT NULL
);


-- [ICM-WEB].dbo.TB_SITUACAO_CONTRATO definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_SITUACAO_CONTRATO;

CREATE TABLE [ICM-WEB].dbo.TB_SITUACAO_CONTRATO (
	id_situacao_contrato int IDENTITY(1,1) NOT NULL,
	situacao_contrato varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK_TB_SITUACAO_CONTRATO PRIMARY KEY (id_situacao_contrato)
);


-- [ICM-WEB].dbo.TB_TIPO_ACAO_LOG definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_TIPO_ACAO_LOG;

CREATE TABLE [ICM-WEB].dbo.TB_TIPO_ACAO_LOG (
	id_tipo_acao_log int IDENTITY(1,1) NOT NULL,
	nm_tipo_acao_log varchar(25) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK_TB_TIPO_ACAO_LOG PRIMARY KEY (id_tipo_acao_log)
);


-- [ICM-WEB].dbo.TB_TIPO_SINALIZACAO_VERTICAL definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_TIPO_SINALIZACAO_VERTICAL;

CREATE TABLE [ICM-WEB].dbo.TB_TIPO_SINALIZACAO_VERTICAL (
	id_tipo_sinal_vertical int IDENTITY(1,1) NOT NULL,
	de_tipo_sinal_vertical varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK_TB_TIPO_SINALIZACAO_VERTICAL PRIMARY KEY (id_tipo_sinal_vertical)
);


-- [ICM-WEB].dbo.TB_VERSAO_SNV definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_VERSAO_SNV;

CREATE TABLE [ICM-WEB].dbo.TB_VERSAO_SNV (
	id_versao_snv int IDENTITY(1,1) NOT NULL,
	num_versao datetime NOT NULL,
	obs varchar(100) COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT IX_TB_VERSAO_SNV UNIQUE (num_versao),
	CONSTRAINT PK_TB_VERSAO_SNV PRIMARY KEY (id_versao_snv)
);


-- [ICM-WEB].dbo.archive definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.archive;

CREATE TABLE [ICM-WEB].dbo.archive (
	id_empresa int IDENTITY(1,1) NOT NULL,
	createdAt bigint NULL,
	fromModel varchar(MAX) COLLATE Latin1_General_CI_AS NULL,
	originalRecord varchar(MAX) COLLATE Latin1_General_CI_AS NULL,
	originalRecordId varchar(MAX) COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT PK__archive__4A0B7E2C2084422D PRIMARY KEY (id_empresa)
);


-- [ICM-WEB].dbo.TB_GRUPOS_USUARIOS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_GRUPOS_USUARIOS;

CREATE TABLE [ICM-WEB].dbo.TB_GRUPOS_USUARIOS (
	id_grupo_usuarios int IDENTITY(1,1) NOT NULL,
	de_grupo_usuarios varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	id_perfil_usuarios int NOT NULL,
	grupo_ativo tinyint DEFAULT 1 NOT NULL,
	CONSTRAINT PK_TB_TIPO_USUARIO PRIMARY KEY (id_grupo_usuarios),
	CONSTRAINT FK_TB_GRUPOS_USUARIOS_TB_PERFIS_USUARIOS FOREIGN KEY (id_grupo_usuarios) REFERENCES [ICM-WEB].dbo.TB_PERFIS_USUARIOS(id_perfil_usuarios)
);


-- [ICM-WEB].dbo.TB_RODOVIA_SNV definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_RODOVIA_SNV;

CREATE TABLE [ICM-WEB].dbo.TB_RODOVIA_SNV (
	id_rodovia_snv int IDENTITY(1,1) NOT NULL,
	versao_snv_id int NOT NULL,
	uf varchar(3) COLLATE Latin1_General_CI_AS NOT NULL,
	br varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	jurisdicao_federal varchar(100) COLLATE Latin1_General_CI_AS NULL,
	superficie varchar(100) COLLATE Latin1_General_CI_AS NULL,
	desconconsiderar_coinc varchar(100) COLLATE Latin1_General_CI_AS NULL,
	codigo varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	local_inicio varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	local_fim varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	km_inicial numeric(10,3) NOT NULL,
	km_final numeric(10,3) NOT NULL,
	extensao numeric(10,3) NOT NULL,
	superficie_federal varchar(100) COLLATE Latin1_General_CI_AS NULL,
	federal_coincidente_3 varchar(100) COLLATE Latin1_General_CI_AS NULL,
	federal_coincidente_2 varchar(100) COLLATE Latin1_General_CI_AS NULL,
	federal_coincidente_1 varchar(100) COLLATE Latin1_General_CI_AS NULL,
	estadual_coincidente varchar(100) COLLATE Latin1_General_CI_AS NULL,
	superficie_estadual_coincidente varchar(100) COLLATE Latin1_General_CI_AS NULL,
	mpv_082_2002 varchar(100) COLLATE Latin1_General_CI_AS NULL,
	concessao_convenio varchar(100) COLLATE Latin1_General_CI_AS NULL,
	ano_referencia varchar(10) COLLATE Latin1_General_CI_AS NULL,
	obs varchar(500) COLLATE Latin1_General_CI_AS NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	CONSTRAINT PK_TB_RODOVIA_SNV PRIMARY KEY (id_rodovia_snv),
	CONSTRAINT FK_TB_RODOVIA_SNV_TB_VERSAO_SNV FOREIGN KEY (versao_snv_id) REFERENCES [ICM-WEB].dbo.TB_VERSAO_SNV(id_versao_snv)
);


-- [ICM-WEB].dbo.TB_UF definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_UF;

CREATE TABLE [ICM-WEB].dbo.TB_UF (
	id_uf int IDENTITY(1,1) NOT NULL,
	geocodigo int NOT NULL,
	nm_uf varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	sigla_uf varchar(2) COLLATE Latin1_General_CI_AS NOT NULL,
	id_regiao int NOT NULL,
	CONSTRAINT PK_TB_UF PRIMARY KEY (id_uf),
	CONSTRAINT FK_TB_UF_TB_REGIAO FOREIGN KEY (id_regiao) REFERENCES [ICM-WEB].dbo.TB_REGIAO(id_regiao)
);


-- [ICM-WEB].dbo.TB_USUARIOS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_USUARIOS;

CREATE TABLE [ICM-WEB].dbo.TB_USUARIOS (
	id_usuario int IDENTITY(1,1) NOT NULL,
	nm_usuario varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	CPF_CNPJ varchar(14) COLLATE Latin1_General_CI_AS NULL,
	id_grupo_usuario int NOT NULL,
	de_email varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	de_senha varchar(MAX) COLLATE Latin1_General_CI_AS NOT NULL,
	recover_token varchar(MAX) COLLATE Latin1_General_CI_AS NULL,
	rpp int DEFAULT 30 NULL,
	rppi int DEFAULT 30 NULL,
	bol_ativo tinyint NOT NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	CONSTRAINT PK_TB_USUARIOS PRIMARY KEY (id_usuario),
	CONSTRAINT FK_TB_USUARIOS_TB_GRUPOS_USUARIOS FOREIGN KEY (id_grupo_usuario) REFERENCES [ICM-WEB].dbo.TB_GRUPOS_USUARIOS(id_grupo_usuarios),
	CONSTRAINT FK_TB_USUARIOS_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_EMPRESAS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_EMPRESAS;

CREATE TABLE [ICM-WEB].dbo.TB_EMPRESAS (
	id_empresa int IDENTITY(1,1) NOT NULL,
	CNPJ varchar(14) COLLATE Latin1_General_CI_AS NOT NULL,
	de_empresa varchar(100) COLLATE Latin1_General_CI_AS NULL,
	de_email varchar(100) COLLATE Latin1_General_CI_AS NULL,
	de_contato varchar(100) COLLATE Latin1_General_CI_AS NULL,
	de_fone varchar(25) COLLATE Latin1_General_CI_AS NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	CONSTRAINT PK_TB_EMPRESAS PRIMARY KEY (id_empresa),
	CONSTRAINT FK_TB_EMPRESAS_TB_USUARIOS_INS FOREIGN KEY (id_user_cadastro) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario),
	CONSTRAINT FK_TB_EMPRESAS_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_LOG definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_LOG;

CREATE TABLE [ICM-WEB].dbo.TB_LOG (
	id_log int IDENTITY(1,1) NOT NULL,
	dt_acao_log datetime NOT NULL,
	descricao varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	id_usuario int NOT NULL,
	id_tipo_acao_log int NOT NULL,
	CONSTRAINT PK_TB_LOG PRIMARY KEY (id_log),
	CONSTRAINT FK_TB_LOG_TB_TIPO_ACAO_LOG FOREIGN KEY (id_tipo_acao_log) REFERENCES [ICM-WEB].dbo.TB_TIPO_ACAO_LOG(id_tipo_acao_log),
	CONSTRAINT FK_TB_LOG_TB_USUARIOS FOREIGN KEY (id_usuario) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_CONTRATOS definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_CONTRATOS;

CREATE TABLE [ICM-WEB].dbo.TB_CONTRATOS (
	id_contrato int IDENTITY(1,1) NOT NULL,
	id_uf int NOT NULL,
	id_empresa int NOT NULL,
	de_contrato varchar(1000) COLLATE Latin1_General_CI_AS NOT NULL,
	num_contrato varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	id_situacao_contrato int NOT NULL,
	data_inicio datetime NOT NULL,
	data_termino datetime NULL,
	extensao float DEFAULT 0 NOT NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	bol_oldversion tinyint NOT NULL,
	CONSTRAINT PK_TB_CONTRATOS PRIMARY KEY (id_contrato),
	CONSTRAINT FK_TB_CONTRATOS_TB_EMPRESAS FOREIGN KEY (id_empresa) REFERENCES [ICM-WEB].dbo.TB_EMPRESAS(id_empresa),
	CONSTRAINT FK_TB_CONTRATOS_TB_SITUACAO_CONTRATO FOREIGN KEY (id_situacao_contrato) REFERENCES [ICM-WEB].dbo.TB_SITUACAO_CONTRATO(id_situacao_contrato),
	CONSTRAINT FK_TB_CONTRATOS_TB_USUARIOS_INS FOREIGN KEY (id_user_cadastro) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario),
	CONSTRAINT FK_TB_CONTRATOS_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_MALHA definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_MALHA;

CREATE TABLE [ICM-WEB].dbo.TB_MALHA (
	id_malha int IDENTITY(1,1) NOT NULL,
	id_contrato int NOT NULL,
	id_uf int NOT NULL,
	rodovia varchar(6) COLLATE Latin1_General_CI_AS NOT NULL,
	num_faixas int NOT NULL,
	sentido varchar(100) COLLATE Latin1_General_CI_AS DEFAULT 'C' NOT NULL,
	superficie varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	km_inicial decimal(8,2) NOT NULL,
	km_final decimal(8,2) NOT NULL,
	latitude_inicial decimal(18,12) NOT NULL,
	longitude_inicial decimal(18,12) NOT NULL,
	latitude_final decimal(18,12) NOT NULL,
	longitude_final decimal(18,12) NOT NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	bol_oldversion tinyint NOT NULL,
	ids_relacionados text COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT PK_TB_MALHA PRIMARY KEY (id_malha),
	CONSTRAINT FK_TB_MALHA_TB_CONTRATOS FOREIGN KEY (id_contrato) REFERENCES [ICM-WEB].dbo.TB_CONTRATOS(id_contrato),
	CONSTRAINT FK_TB_MALHA_TB_UF FOREIGN KEY (id_uf) REFERENCES [ICM-WEB].dbo.TB_UF(id_uf),
	CONSTRAINT FK_TB_MALHA_TB_USUARIOS_INS FOREIGN KEY (id_user_cadastro) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario),
	CONSTRAINT FK_TB_MALHA_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_SINALIZACAO_VERTICAL definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_SINALIZACAO_VERTICAL;

CREATE TABLE [ICM-WEB].dbo.TB_SINALIZACAO_VERTICAL (
	id_sinalizacao_vertical int IDENTITY(1,1) NOT NULL,
	id_malha int NOT NULL,
	km decimal(18,3) NOT NULL,
	[data] datetime NOT NULL,
	lado varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	id_tipo_sinal_vertical int NOT NULL,
	id_codigo_sinal_vertical varchar(10) COLLATE Latin1_General_CI_AS NULL,
	Imagem varchar(150) COLLATE Latin1_General_CI_AS NOT NULL,
	latitude decimal(18,12) NOT NULL,
	longitude decimal(18,12) NOT NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	CONSTRAINT PK_TB_SINALIZACAO_VERTICAL PRIMARY KEY (id_sinalizacao_vertical),
	CONSTRAINT FK_TB_SINALIZACAO_VERTICAL_TB_CODIGO_SINALIZACAO_VERTICAL FOREIGN KEY (id_codigo_sinal_vertical) REFERENCES [ICM-WEB].dbo.TB_CODIGO_SINALIZACAO_VERTICAL(id_codigo_sinal_vertical),
	CONSTRAINT FK_TB_SINALIZACAO_VERTICAL_TB_MALHA FOREIGN KEY (id_malha) REFERENCES [ICM-WEB].dbo.TB_MALHA(id_malha),
	CONSTRAINT FK_TB_SINALIZACAO_VERTICAL_TB_TIPO_SINALIZACAO_VERTICAL FOREIGN KEY (id_tipo_sinal_vertical) REFERENCES [ICM-WEB].dbo.TB_TIPO_SINALIZACAO_VERTICAL(id_tipo_sinal_vertical),
	CONSTRAINT FK_TB_SINALIZACAO_VERTICAL_TB_USUARIOS_INS FOREIGN KEY (id_user_cadastro) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario),
	CONSTRAINT FK_TB_SINALIZACAO_VERTICAL_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_USUARIOS_CONTRATO definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_USUARIOS_CONTRATO;

CREATE TABLE [ICM-WEB].dbo.TB_USUARIOS_CONTRATO (
	id_contrato int NOT NULL,
	bol_oldversion tinyint NOT NULL,
	id_usuario int NOT NULL,
	CONSTRAINT TB_USUARIOS_CONTRATO_PK PRIMARY KEY (id_contrato,id_usuario),
	CONSTRAINT FK_TB_USUARIOS_CONTRATO_TB_CONTRATOS FOREIGN KEY (id_contrato) REFERENCES [ICM-WEB].dbo.TB_CONTRATOS(id_contrato),
	CONSTRAINT FK_TB_USUARIOS_CONTRATO_TB_USUARIOS FOREIGN KEY (id_usuario) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);
 CREATE NONCLUSTERED INDEX TB_USUARIOS_CONTRATO_id_contrato_IDX ON dbo.TB_USUARIOS_CONTRATO (  id_contrato ASC  , id_usuario ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [ICM-WEB].dbo.TB_AVALIACAO_MALHA definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_AVALIACAO_MALHA;

CREATE TABLE [ICM-WEB].dbo.TB_AVALIACAO_MALHA (
	id_avaliacao_malha int IDENTITY(1,1) NOT NULL,
	id_malha int NOT NULL,
	panela varchar(10) COLLATE Latin1_General_CI_AS NULL,
	I_panela decimal(8,3) NULL,
	remendo varchar(10) COLLATE Latin1_General_CI_AS NULL,
	I_remendo decimal(8,3) NULL,
	trincamento varchar(10) COLLATE Latin1_General_CI_AS NULL,
	I_trincamento decimal(8,3) NULL,
	rocada varchar(10) COLLATE Latin1_General_CI_AS NOT NULL,
	I_rocada decimal(8,3) NULL,
	drenagem varchar(10) COLLATE Latin1_General_CI_AS NOT NULL,
	I_drenagem decimal(8,3) NULL,
	sinalizacao varchar(10) COLLATE Latin1_General_CI_AS NOT NULL,
	I_sinalizacao decimal(8,3) NULL,
	latitude float NOT NULL,
	longitude float NOT NULL,
	km_inicial decimal(8,3) NOT NULL,
	km_final decimal(8,3) NOT NULL,
	sentido varchar(1) COLLATE Latin1_General_CI_AS NOT NULL,
	observacao varchar(500) COLLATE Latin1_General_CI_AS NULL,
	data_avaliacao datetime NOT NULL,
	ICP decimal(8,3) NULL,
	ICC decimal(8,3) NULL,
	ICM decimal(8,3) NULL,
	dt_cadastro datetime NOT NULL,
	id_user_cadastro int NOT NULL,
	dt_atualizacao datetime NOT NULL,
	id_user_atualizacao int NOT NULL,
	bol_oldversion tinyint NOT NULL,
	bol_completo tinyint NOT NULL,
	CONSTRAINT PK_TB_AVALIACAO_MALHA PRIMARY KEY (id_avaliacao_malha),
	CONSTRAINT FK_TB_AVALIACAO_MALHA_TB_MALHA FOREIGN KEY (id_malha) REFERENCES [ICM-WEB].dbo.TB_MALHA(id_malha),
	CONSTRAINT FK_TB_AVALIACAO_MALHA_TB_USUARIOS_INS FOREIGN KEY (id_user_cadastro) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario),
	CONSTRAINT FK_TB_AVALIACAO_MALHA_TB_USUARIOS_UPD FOREIGN KEY (id_user_atualizacao) REFERENCES [ICM-WEB].dbo.TB_USUARIOS(id_usuario)
);


-- [ICM-WEB].dbo.TB_AVALIACAO_FOTO definition

-- Drop table

-- DROP TABLE [ICM-WEB].dbo.TB_AVALIACAO_FOTO;

CREATE TABLE [ICM-WEB].dbo.TB_AVALIACAO_FOTO (
	id_avaliacao_foto int IDENTITY(1,1) NOT NULL,
	id_avaliacao_malha int NOT NULL,
	imagem varchar(150) COLLATE Latin1_General_CI_AS NULL,
	observacao varchar(500) COLLATE Latin1_General_CI_AS NULL,
	latitude float NOT NULL,
	longitude float NOT NULL,
	CONSTRAINT PK_TB_AVALIACAO_FOTO PRIMARY KEY (id_avaliacao_foto),
	CONSTRAINT FK_TB_AVALIACAO_FOTO_TB_AVALIACAO_MALHA FOREIGN KEY (id_avaliacao_malha) REFERENCES [ICM-WEB].dbo.TB_AVALIACAO_MALHA(id_avaliacao_malha)
);


-- dbo.ANALISE source

-- dbo.ANALISE source

-- dbo.ANALISE source

-- dbo.ANALISE source

-- dbo.ANALISE source

-- dbo.ANALISE source

CREATE VIEW [ANALISE]
AS
  SELECT
       L.ano AS ano_avaliacao,
       L.mes AS mes_avaliacao,
       C.data_inicio AS data_inicio_contrato,
       C.data_termino AS data_termino_contrato,
       C.num_contrato,
       L.UF,
       C.extensao AS total,
       SUM(L.extensao) AS km
  FROM [ICM-WEB].dbo.TB_CONTRATOS C
INNER JOIN
       [ICM-WEB].dbo.TB_MALHA M ON (M.id_contrato = C.id_contrato)
INNER JOIN
       [ICM-WEB].dbo.KMS_LEVANTADOS L ON (L.num_contrato = C.num_contrato)
WHERE C.extensao > 0
GROUP BY
      L.ano,
      L.mes,
      C.data_inicio,
      C.data_termino,
      C.num_contrato,
      C.extensao,
      L.UF;


-- dbo.COORDENADAS source

CREATE VIEW COORDENADAS
AS
  SELECT U.sigla_uf AS UF,
	     M.rodovia,
	     M.sentido,
	     A.km_inicial,
	     A.km_final,
	     ROUND(AVG(A.latitude),7) AS latitude,
	     ROUND(AVG(A.longitude),7) AS longitude
    FROM [ICM-WEB].dbo.TB_AVALIACAO_MALHA AS A
	     INNER JOIN [ICM-WEB].dbo.TB_MALHA AS M ON M.id_malha = A.id_malha
	     INNER JOIN [ICM-WEB].dbo.TB_UF AS U ON U.id_uf = M.id_uf
   WHERE A.latitude < 6 AND A.latitude > -34 AND A.longitude < -34 AND A.longitude > -74
GROUP BY U.sigla_uf,
         M.rodovia,
         M.sentido,
         A.km_inicial,
         A.km_final;


-- dbo.KMS_LEVANTADOS source

CREATE VIEW [KMS_LEVANTADOS]
AS
SELECT 
	   L.ano AS ano_avaliacao,
	   L.mes AS mes_avaliacao,
	   L.id_contrato,
	   L.num_contrato,
	   L.id_malha,
	   L.extensao_contratada,
       L.UF,
	   L.rodovia,
	   CASE WHEN L.num_faixas = 1 THEN 'Simples' ELSE 'Dupla' END AS tipo_rodovia,
	   L.sentido,
	   L.superficie,
	   MIN(L.km_inicial) AS min_km_ini,
	   MAX(L.km_final) AS max_km_fin,
	   MIN(L.km_final) AS min_km_fin,
	   MAX(L.km_inicial) AS max_km_ini,
	   MAX(L.data_avaliacao) AS data_avaliacao,
	   SUM(ABS(L.km_final - L.km_inicial)) AS extensao_avaliada
  FROM [LEVANTAMENTOS] L
  GROUP BY
	   L.ano,
	   L.mes,
	   L.id_contrato,
       L.num_contrato,
       L.id_malha,
	   L.extensao_contratada,
       L.UF,
	   L.rodovia,
	   L.num_faixas,
	   L.sentido,
	   L.superficie;


-- dbo.LEVANTAMENTOS source

CREATE VIEW [LEVANTAMENTOS]
AS
  SELECT
       C.id_contrato,
       C.num_contrato,
       M.id_malha,
       C.extensao AS extensao_contratada,
       U.sigla_uf AS UF,
	   M.rodovia,
	   M.num_faixas,
	   A.sentido,
	   M.superficie,
	   A.km_inicial,
	   A.km_final,
	   M.latitude_inicial,
	   M.longitude_inicial,
	   A.ICM,
	   A.ICC,
	   A.ICP,
	   YEAR( A.data_avaliacao ) AS ano,
	   MONTH( A.data_avaliacao ) AS mes,
	   A.data_avaliacao
  FROM TB_AVALIACAO_MALHA A
  INNER JOIN TB_MALHA M ON (M.id_malha = A.id_malha)
  INNER JOIN TB_UF U ON (U.id_uf = M.id_uf)
  INNER JOIN TB_CONTRATOS C ON (C.id_contrato = M.id_contrato);

