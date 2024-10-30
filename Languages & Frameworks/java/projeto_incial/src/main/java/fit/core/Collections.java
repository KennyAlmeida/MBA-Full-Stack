package fit.core;

public class Collections {
    public static void executar(){
        System.out.println("Array list");
        List<String> namesList = new ArrayList<>() {{
            add("Kenny");
            add("Almeida");
        }};
        namesList.add("Novo");
        System.out.println(namesList);

        List<Integer> numeros = List.of(e1:1, e2:2, e3:3);
        System.out.println(numeros);

        Map<String, String> registro = new LinkedHashMap<>() {{
            put(key:"chave-1", value:"1");
            put(key:"chave-2", value:"2");
        }};

        System.out.println(registro);

        Map<String, String> registro2 = Map.of(k1:"chave-1", v1:"1", k2:"chave-2", v2:"2");
        System.out.println(registro2);
    }
}
