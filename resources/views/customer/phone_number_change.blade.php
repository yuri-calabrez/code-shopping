@extends('layouts.app')

@section('content')
    <p id="result">Atualizando telefone...</p>

    <script type="text/javascript">
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 204) {
                document.getElementById('result').innerHTML = 'Telefone atualizado com sucesso!';
            } else {
                document.getElementById('result').innerHTML = 'Não foi possível atualizar o telefone.';
            }
        }
        xhttp.open('PATCH', '/api/customers/phone_numbers/{{$token}}', true);
        xhttp.send()
    </script>
@endsection