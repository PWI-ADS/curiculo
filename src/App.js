import { render } from "@testing-library/react";
import { useEffect, useState } from "react"


const STORAGE_KEY = 'curriculo'

const App = () => {
    const [curriculo, setCurriculo] = useState({});
    let [editando, setEditando] = useState(false);
    let [curriculoSalvo, setcurriculoSalvo] = useState(true);
    const [pessoaNome, setPessoaNome] = useState('')
    const [pessoaEmail, setPessoaEmail] = useState('')
    const [pessoaFone, setPessoaFone] = useState('')
    const [pessoaCargo, setPessoaCargo] = useState('')
    const [pessoaHistorico, setPessoaHistorico] = useState('')
    useEffect(() => {
      const tempCurriculo = localStorage.getItem(STORAGE_KEY)

      if (tempCurriculo != null) {
          setCurriculo(JSON.parse(tempCurriculo))

          setPessoaNome(curriculo.pessoaNome);
          setPessoaEmail(curriculo.pessoaEmail);
          setPessoaFone(curriculo.pessoaFone);
          setPessoaCargo(curriculo.pessoaCargo);
          setPessoaHistorico(curriculo.pessoaHistorico);
      } else {
          setcurriculoSalvo(false);
      }
  }, [curriculo.pessoaNome, 
      curriculo.pessoaEmail,
      curriculo.pessoaFone,
      curriculo.pessoaCargo,
      curriculo.pessoaHistorico])


    const curriculoCriar = () => {
        render();
        setEditando(true);
        setcurriculoSalvo(false);
    }

    const curriculoSalvar = () => {
        setEditando(false);
        setcurriculoSalvo(true);
        curriculoStorageSalvar();
        render();
        
    }

    const curriculoStorageSalvar = () => {
        const Curriculo = {
            pessoaNome, 
            pessoaEmail,
            pessoaFone,
            pessoaCargo,
            pessoaHistorico
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Curriculo))
    }

    const curriculoEditar = () => {
        setEditando(true);
        setcurriculoSalvo(false);
        render();
    }

    if(!curriculoSalvo && !editando){
        return (
            <>
                <br />
                <input type="button" value="Criar Curriculo" onClick={curriculoCriar}/>
            </>
        )
    }

    if(!editando && curriculoSalvo){
        return(
            <>
            <h1>{pessoaNome}</h1>
            {pessoaEmail}
            <br></br>
            {pessoaFone}
            <br></br>
            <br></br>
            {pessoaCargo}
            <br></br>
            {pessoaHistorico}
            <br /><br></br>
            <input type="button" value="Editar" onClick={curriculoEditar}/>
            </>
        )
    }

    if(editando && !curriculoSalvo){
        return (
            <>
                <input type="text"  value={pessoaNome} placeholder="Nome"
                    onChange={event => setPessoaNome(event.target.value)} />
                <div></div>

                <br />

                <input type="text" value={pessoaEmail} placeholder="Email"
                    onChange={event => setPessoaEmail(event.target.value)} />
                <div></div>

                <br />

                <input type="text" value={pessoaFone} placeholder="Telefone"
                    onChange={event => setPessoaFone(event.target.value)} />
                <div></div>

                <br />

                <input type="text"  value={pessoaCargo} placeholder="Cargo"
                    onChange={event => setPessoaCargo(event.target.value)} />
                <div></div>

                <br />

                <input type="text" value={pessoaHistorico} placeholder="Historico"
                    onChange={event => setPessoaHistorico(event.target.value)} />
                <div></div>

                <input type="button" value="Salvar" onClick={curriculoSalvar}/>
            </>
        )
    }
    
}

export default App;