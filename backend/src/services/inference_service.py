from src.services.data_loader import load_json

def combine_cf(cf1, cf2):
    """Rumus kombinasi CF positif"""
    return cf1 + cf2 * (1 - cf1)


def forward_chaining_cf(user_gejala: dict):
    """
    user_gejala = {
        "G01": 0.8,
        "G02": 0.6,
        "G04": 1.0
    }
    """
    rules = load_json("cf_rules.json")
    hasil = {}

    for rule in rules:
        penyakit = rule["penyakit"]
        premis = rule["premis"]
        cf_pakar = rule["cf_pakar"]

        # 🔹 Forward chaining: cek IF (premis)
        if all(g in user_gejala for g in premis):
            # AND → ambil CF minimum
            cf_user = min(user_gejala[g] for g in premis)
            cf_rule = cf_user * cf_pakar

            if penyakit not in hasil:
                hasil[penyakit] = cf_rule
            else:
                hasil[penyakit] = combine_cf(
                    hasil[penyakit],
                    cf_rule
                )

    return hasil
